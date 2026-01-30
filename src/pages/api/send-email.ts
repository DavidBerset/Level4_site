import type { APIRoute } from 'astro';
import { Resend } from 'resend';

interface EmailRequest {
  to: string;
  subject: string;
  type: 'admin' | 'confirmation';
  formData?: {
    email: string;
    phone: string;
    eventType: string;
    date: string;
    location: string;
    audience: string;
    budget: string;
    message: string;
  };
  userName?: string;
  eventType?: string;
}

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const adminEmail = import.meta.env.ADMIN_EMAIL || 'admin@level4.com';
const fromEmail = import.meta.env.FROM_EMAIL || 'noreply@level4.com';

export const POST: APIRoute = async ({ request }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body: EmailRequest = await request.json();

    // Validate required fields
    if (!body.to || !body.subject || !body.type) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let htmlContent = '';

    if (body.type === 'admin' && body.formData) {
      // Admin email
      htmlContent = `
        <h2>Nouvelle demande de devis</h2>
        <p><strong>Email:</strong> ${body.formData.email}</p>
        <p><strong>Téléphone:</strong> ${body.formData.phone}</p>
        <p><strong>Type d'événement:</strong> ${body.formData.eventType}</p>
        <p><strong>Date:</strong> ${body.formData.date}</p>
        <p><strong>Lieu:</strong> ${body.formData.location}</p>
        <p><strong>Jauge:</strong> ${body.formData.audience} personnes</p>
        <p><strong>Budget:</strong> ${body.formData.budget}</p>
        <p><strong>Message:</strong> ${body.formData.message || 'N/A'}</p>
      `;
    } else if (body.type === 'confirmation') {
      // Confirmation email to user
      htmlContent = `
        <h2>Merci pour votre demande de devis</h2>
        <p>Bonjour,</p>
        <p>Nous avons bien reçu votre demande de devis pour un événement de type <strong>${body.eventType}</strong>.</p>
        <p>Notre équipe vous répondra dans la journée.</p>
        <p>Cordialement,<br/>L'équipe LEVEL4</p>
      `;
    }

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: body.to,
      subject: body.subject,
      html: htmlContent
    });

    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error);
      return new Response(JSON.stringify({ 
        error: 'Failed to send email',
        details: emailResponse.error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Return success response
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Email sent successfully',
      id: emailResponse.data?.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing email request:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process email request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

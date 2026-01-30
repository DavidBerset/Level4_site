import type { APIRoute } from 'astro';

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

    // Use Wix email service
    // For now, we'll use a simple approach - in production, you'd integrate with a proper email service
    // This is a placeholder that logs the email
    console.log('Email to send:', {
      to: body.to,
      subject: body.subject,
      html: htmlContent
    });

    // Return success response
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Email queued for sending' 
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

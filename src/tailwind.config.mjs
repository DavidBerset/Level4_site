/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.75', letterSpacing: '0em', fontWeight: '400' }],
                xl: ['1.25rem', { lineHeight: '1.75', letterSpacing: '0em', fontWeight: '500' }],
                '2xl': ['1.5rem', { lineHeight: '2', letterSpacing: '-0.01em', fontWeight: '600' }],
                '3xl': ['1.875rem', { lineHeight: '2.25', letterSpacing: '-0.015em', fontWeight: '700' }],
                '4xl': ['2.25rem', { lineHeight: '2.5', letterSpacing: '-0.02em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '800' }],
                '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '800' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.035em', fontWeight: '900' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '900' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.045em', fontWeight: '900' }],
            },
            fontFamily: {
                heading: "space grotesk",
                paragraph: "nunito sans"
            },
            colors: {
                'light-cyan': '#B2F2FF',
                'dark-grey': '#1E2129',
                destructive: '#FF453A',
                'destructive-foreground': '#FFFFFF',
                background: '#0B0E13',
                secondary: '#E7ECF2',
                foreground: '#E7ECF2',
                'secondary-foreground': '#0B0E13',
                'primary-foreground': '#0B0E13',
                primary: '#00E5FF'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}

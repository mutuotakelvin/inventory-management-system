export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/products/new',
        '/products/edit/:id+',
    ]
}
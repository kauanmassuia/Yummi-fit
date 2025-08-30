export async function login(req, res, next) {
  // TODO: autenticação real (JWT ou sessão)
  res.json({ token: 'dev-token' });
}

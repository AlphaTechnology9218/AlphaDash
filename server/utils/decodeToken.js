/**
 * Decodifica um token JWT sem verificar assinatura (apenas para extrair informações)
 */
export function decodeJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token inválido');
    }

    // Decodificar payload (parte 2)
    const payload = parts[1];
    const decoded = Buffer.from(payload, 'base64').toString('utf-8');
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
}



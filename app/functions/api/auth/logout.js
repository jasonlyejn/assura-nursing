import { json } from '../_lib/respond.js';
import { cookie } from '../_lib/session.js';

export async function onRequestPost() {
  return json({ ok: true }, { headers: { 'Set-Cookie': cookie('', 0) } });
}

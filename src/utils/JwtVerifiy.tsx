export async function verifyJwtToken(token:string) {
if (token) {
  return true;
}else{
  return false;
}
}
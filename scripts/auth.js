// scripts/auth.js
// Simulated auth module (client-side only). Replace with Firebase later.

/**
 * Usage:
 * - For user login (OTP): call sendUserOtp(phone) then verifyUserOtp(code)
 * - For admin login (email/password): call adminEmailSignIn(email, password)
 * - For admin OTP: sendAdminOtp(phone) then verifyAdminOtp(code)
 * 
 * Current user info stored in sessionStorage under 'apm_current_user'
 * Admin list stored in localStorage under 'apm_admins' (array)
 */

// helper localStorage wrappers
const _getAdmins = () => {
  try {
    const raw = localStorage.getItem('apm_admins');
    return raw ? JSON.parse(raw) : [];
  } catch(e){ return []; }
};
const _setAdmins = (arr) => localStorage.setItem('apm_admins', JSON.stringify(arr));

// simulate sending OTP (no real SMS)
export function sendUserOtp(phone){
  // Minimal validation
  if(!phone || phone.length < 6) return { ok:false, msg:"Enter valid phone" };
  // Save a "sentOTP" in session for verification (we'll use 123456 as default)
  sessionStorage.setItem('apm_user_sent_otp', '123456');
  sessionStorage.setItem('apm_user_phone', phone);
  return { ok:true, msg:"OTP sent (simulated). Use code 123456 to verify." };
}

export function verifyUserOtp(code){
  const sent = sessionStorage.getItem('apm_user_sent_otp');
  const phone = sessionStorage.getItem('apm_user_phone');
  if(!sent || !phone) return { ok:false, msg:"No OTP sent" };
  if(code === sent){
    const user = { uid: 'user-'+Date.now(), phone };
    sessionStorage.setItem('apm_current_user', JSON.stringify(user));
    sessionStorage.removeItem('apm_user_sent_otp');
    return { ok:true, user };
  } else {
    return { ok:false, msg:"Incorrect OTP" };
  }
}

// Admin: email/password simulated
export function adminEmailSignUp(email, password){
  if(!email || !password) return { ok:false, msg:"Provide email and password" };
  // Save admin into localStorage admins
  const admins = _getAdmins();
  if(!admins.includes(email)) admins.push(email);
  _setAdmins(admins);
  // Also store credentials (just for demo) - WARNING: not secure. Replace with Firebase later.
  let store = JSON.parse(localStorage.getItem('apm_admin_creds') || '{}');
  store[email] = { password };
  localStorage.setItem('apm_admin_creds', JSON.stringify(store));
  return { ok:true, msg:"Admin created (local demo). Please login." };
}

export function adminEmailSignIn(email, password){
  const store = JSON.parse(localStorage.getItem('apm_admin_creds') || '{}');
  if(store[email] && store[email].password === password){
    const admin = { uid:'admin-'+Date.now(), email };
    sessionStorage.setItem('apm_current_user', JSON.stringify(admin));
    // make sure email is in admin list
    const admins = _getAdmins();
    if(!admins.includes(email)) { admins.push(email); _setAdmins(admins); }
    return { ok:true, admin };
  } else {
    return { ok:false, msg:"Invalid email/password" };
  }
}

// Admin OTP flow (simulated)
export function sendAdminOtp(phone){
  if(!phone || phone.length < 6) return { ok:false, msg:"Enter valid phone" };
  sessionStorage.setItem('apm_admin_sent_otp','123456');
  sessionStorage.setItem('apm_admin_phone', phone);
  return { ok:true, msg:"Admin OTP sent (simulated). Use 123456." };
}
export function verifyAdminOtp(code){
  const sent = sessionStorage.getItem('apm_admin_sent_otp');
  const phone = sessionStorage.getItem('apm_admin_phone');
  if(!sent || !phone) return { ok:false, msg:"No OTP sent" };
  if(code === sent){
    // add phone to admins list
    const admins = _getAdmins();
    if(!admins.includes(phone)) admins.push(phone);
    _setAdmins(admins);
    const admin = { uid:'admin-'+Date.now(), phone };
    sessionStorage.setItem('apm_current_user', JSON.stringify(admin));
    sessionStorage.removeItem('apm_admin_sent_otp');
    return { ok:true, admin };
  } else {
    return { ok:false, msg:"Incorrect OTP" };
  }
}

// sign out
export function signOut(){
  sessionStorage.removeItem('apm_current_user');
  return { ok:true };
}

// get current user (if any)
export function getCurrentUser(){
  const raw = sessionStorage.getItem('apm_current_user');
  return raw ? JSON.parse(raw) : null;
}

// is current user admin?
export function isCurrentAdmin(){
  const user = getCurrentUser();
  if(!user) return false;
  const admins = _getAdmins();
  // check by email or phone
  if(user.email && admins.includes(user.email)) return true;
  if(user.phone && admins.includes(user.phone)) return true;
  return false;
}

// helper to require admin - returns boolean
export function requireAdmin(){
  const ok = isCurrentAdmin();
  if(!ok) {
    alert("Admin access required. Login as admin first.");
  }
  return ok;
}

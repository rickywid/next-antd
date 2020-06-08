export const cookieHeader = {
    httpOnly: false,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: true,
    path: '/'
}

export const cookieHeaderSignOut = {
  httpOnly: false,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: true,
  path: '/',
  expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT')
}

export const readCookie = (cname: string) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
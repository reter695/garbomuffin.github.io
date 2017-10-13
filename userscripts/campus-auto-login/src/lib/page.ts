export enum PageState {
  Normal,
  Error,
  Captcha
}

export enum PageType {
  CampusNew,
  CampusOld,
  TCI,
  BIM,
  Empower,
  EmpowerLoggedIn,
  GoogleChooseAccount,
  GoogleConsent,

  Config,
}

export function getPageType(): PageType | null {
  if (location.href.indexOf("student.teachtci.com/student/sign_in") > -1) {
    return PageType.TCI;
  } else if (location.href.indexOf("campus.district112.org/campus/portal/isd112.jsp") > -1) {
    return PageType.CampusOld;
  } else if (location.href.indexOf("campus.district112.org/campus/portal/students/isd112") > -1) {
    return PageType.CampusNew;
  } else if (location.href.indexOf("bigideasmath.com/BIM/login") > -1) {
    return PageType.BIM;
  } else if (location.href.indexOf("empower.district112.org/default.aspx") > -1) {
    return PageType.Empower;
  } else if (location.href.indexOf("empower.district112.org/iFrame.aspx?iCtrl=PLAYLIST_WINDOW") > -1) {
    return PageType.EmpowerLoggedIn;
  } else if (location.href.indexOf("accounts.google.com/signin/oauth/consent") > -1) {
    return PageType.GoogleConsent;
  } else if (location.href.indexOf("accounts.google.com/signin/oauth/oauthchooseaccount") > -1) {
    return PageType.GoogleChooseAccount;
  } else if (location.href.indexOf("userscripts/campus-auto-login/config.html") > -1) {
    return PageType.Config;
  } else {
    return null;
  }
}
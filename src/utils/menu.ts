export function isMenuActive(pathname: string, menu: string) {
  if (pathname != "/" && pathname != "/es/") {
    return menu != "/" && pathname.includes(menu);
  } else {
    return menu == "/" || menu == "/es/";
  }
}

export function isCompActive(pathname: string, menu: string) {
  if (
    menu == "buyer" &&
    (pathname.includes("buyer/result/") || pathname.includes("buyer/overview/"))
  ) {
    return false;
  }

  if (pathname != "/" && pathname != "/es/") {
    return menu != "/" && pathname.includes(menu);
  } else {
    return menu == "/" || menu == "/es/";
  }
}

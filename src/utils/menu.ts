export function isMenuActive(pathname: string, menu: string) {
  if (pathname != "/" && pathname != "/es/") {
    return menu != "/" && pathname.includes(menu);
  } else {
    return menu == "/" || menu == "/es/";
  }
}

const root = document.getElementById("root");
const routePathnames = {
  RESUME: "/",
};
const routes = [{ path: routePathnames.RESUME, page: resumePageView }];

window.onload = function (e) {
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  route(pathname, hash);
};

function route(pathname, hash) {
  const route = routes.find((r) => r.path == pathname);
  if (route) {
    if (hash && hash.length > 1) {
      route.page(hash.substring(1));
    } else {
      route.page();
    }
  } else {
    routes[0].page();
  }
}

async function resumePageView() {
  const response = await fetch("./resume.html", { cache: "no-store" });
  root.innerHTML = "";
  root.innerHTML = await response.text();
}

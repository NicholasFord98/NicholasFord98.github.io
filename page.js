const DEV = true;
const root = document.getElementById("root");

// Routing
const routePathnames = {
  HOME: "/",
  RESUME: "/Resume",
  CS_CAPSTONE: "/Spend-Sense-Info",
  SE_CAPSTONE: "/Dungeon-Explorer-Info",
};

const routes = [
  { path: routePathnames.HOME, page: loadHomePage },
  { path: routePathnames.RESUME, page: () => loadStaticContent("RESUME") },
  { path: routePathnames.CS_CAPSTONE, page: () => loadStaticContent("CS_CAPSTONE") },
  { path: routePathnames.SE_CAPSTONE, page: () => loadStaticContent("SE_CAPSTONE") },
];

const pageNames = {
  HOME: "./home.html",
  RESUME: "./resume.html",
  CS_CAPSTONE: "./cs_capstone.html",
  SE_CAPSTONE: "./se_capstone.html",
};

window.onload = function(e) {
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

// Page loading functions
async function loadStaticContent(pageName) {
  // const pageNames prevents loading arbitrary files (sanity checking)
  let page = pageNames[pageName];
  if (!page) {
    if (DEV) {
      console.log("Called loadStaticContent with unrecognized argument ", pageName);
    }
    alert("Failed to locate file '" + pageName + "'; loading default...");
    page = pageNames["RESUME"];
  }
  const response = await fetch(page, { cache: "no-store" });
  root.innerHTML = "";
  root.innerHTML = await response.text();
}

async function loadHomePage() {
  await loadStaticContent("HOME");
  const resumeButton = document.getElementById("resumeButton");
  resumeButton.onclick = () => loadStaticContent("RESUME");
}

// components/Header.tsx
import { Link, useLocation, useParams } from "@remix-run/react";
import { Params } from "@remix-run/react";

function getLang(params: Params<string>) {
  const lang = params.lang ?? "en";
  if (lang !== "ja" && lang !== "en") {
    throw new Response(null, {
      status: 404,
      statusText: `Not Found: Invalid language ${lang}`,
    });
  }
  return lang;
}

export default function LangSwitch() {
  const { pathname } = useLocation();
  const params = useParams();
  const lang = getLang(params);

  return (
    <div id="header">
      <h1>
        {lang === "ja" ? `Optional Segments デモ` : `Optional Segments Example`}
      </h1>
      <nav>
        {lang === "ja" ? (
          <Link to={pathname.replace(/^\/ja/, "en")}>🇺🇸</Link>
        ) : (
          <Link to={`/ja${pathname}`}>🇯🇵</Link>
        )}
      </nav>
    </div>

    
  );
}
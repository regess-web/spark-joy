import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuroTrilhas | Foco, atenção e aprendizagem" },
      {
        name: "description",
        content:
          "Atividades lúdicas para praticar atenção, memória e raciocínio com crianças.",
      },
      { property: "og:title", content: "NeuroTrilhas | Foco, atenção e aprendizagem" },
      {
        property: "og:description",
        content:
          "Atividades lúdicas para praticar atenção, memória e raciocínio com crianças.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: NeuroTrilhasLandingPage,
});

function NeuroTrilhasLandingPage() {
  return (
    <main style={{ width: "100%", minHeight: "100vh", margin: 0, padding: 0 }}>
      <iframe
        src="/neurotrilhas.html"
        title="NeuroTrilhas — atividades para crianças"
        style={{
          display: "block",
          width: "100%",
          height: "100vh",
          minHeight: "100vh",
          border: 0,
        }}
      />
    </main>
  );
}

import type { Metadata } from "next";
import ConfinedSpacesPage from "./ConfinedSpacesPage";

export const metadata: Metadata = {
  title: "Confined Space Inspection Robots",
  description: "Patent-granted robotic systems for inspecting tanks, tunnels, sewers, and ducts. Zero human risk in confined space operations.",
};

export default function Page() {
  return <ConfinedSpacesPage />;
}

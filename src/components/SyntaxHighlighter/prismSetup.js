// Expose prism-react-renderer's vendored Prism as the global so that
// `prismjs/components/*` grammar files (imported after this module) attach
// their languages to the SAME instance that <Highlight> uses.
import { Prism } from "prism-react-renderer";

if (typeof window !== "undefined") {
  window.Prism = Prism;
} else {
  globalThis.Prism = Prism;
}

export default Prism;

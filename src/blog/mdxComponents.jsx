import { Link } from "react-router-dom";
import InfoDiv from "../components/InfoDIV/InfoDiv";
import MustReadDiv from "../components/MustReadDIV/MustReadDiv";
import InsightDiv from "../components/InsightDiv/InsightDIV";
import BlogImage from "../components/BlogImage/BlogImage";
import BitsAnimation from "../components/BitsAnimation/BitsAnimation";
import NumberSystemExplorer from "../components/NumberSystemExplorer/NumberSystemExplorer";
import BitSwitches from "../components/BitSwitches/BitSwitches";
import BinaryDecimalConverter from "../components/BinaryDecimalConverter/BinaryDecimalConverter";
import RegisterBits from "../components/RegisterBits/RegisterBits";
import TwosComplement from "../components/TwosComplement/TwosComplement";
import IntegerCycle from "../components/IntegerCycle/IntegerCycle";
import CodeSnippet from "../components/SyntaxHighlighter/CodeSnippet";
import CodeSandpack from "../components/CodeSandpack/CodeSandpack";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import VideoGrid from "../components/VideoGrid/VideoGrid";
import Random from "../components/Random/Random";

// Turns a ```lang fenced code block (rendered by MDX as <pre><code>) into the
// styled CodeSnippet with copy button + theme-aware highlighting.
const Pre = ({ children }) => {
  const codeEl = children?.props ? children : null;
  const className = codeEl?.props?.className || "";
  const language = className.replace(/language-/, "") || "text";
  const raw = codeEl?.props?.children ?? "";
  const codeText = typeof raw === "string" ? raw.replace(/\n$/, "") : raw;
  return <CodeSnippet codeText={codeText} language={language} />;
};

// Internal links (/blogs/...) use react-router; external links open in a new tab.
const Anchor = ({ href = "", children, ...rest }) => {
  const isInternal = href.startsWith("/");
  if (isInternal) {
    return (
      <Link className="link" to={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a
      className="link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
};

/**
 * Component map handed to MDXProvider. Every blog gets these for free —
 * no per-file imports. Authoring a note is `<InfoNote>text</InfoNote>`;
 * a code block is a plain ```lang fence; an image is `![alt](./x.webp)`.
 */
export const mdxComponents = {
  // Prose element overrides
  a: Anchor,
  pre: Pre,
  // `### Heading` becomes a section title (styled + picked up by the auto-TOC).
  h3: (props) => <h3 className="blog-section-title" {...props} />,
  h4: (props) => <h4 className="sub-title" {...props} />,
  // Lead paragraph styling: `<Intro>...</Intro>` at the top of a blog. Renders a
  // <div> (not <p>): MDX wraps the block content in its own <p>, and <p> inside
  // <p> is invalid DOM nesting.
  Intro: ({ children }) => <div className="open-txt">{children}</div>,
  img: (props) => <BlogImage src={props.src} alt={props.alt} description={props.alt} />,
  // Custom callouts (children-based, no HTML strings)
  InfoNote: ({ children }) => <InfoDiv>{children}</InfoDiv>,
  MustRead: ({ children }) => <MustReadDiv>{children}</MustReadDiv>,
  Insight: ({ children }) => <InsightDiv>{children}</InsightDiv>,
  // Dual-asset image (separate dark/light source) for cases a single src won't do
  BlogImage,
  // Rich embeds — available in every blog with no per-file import
  BitsAnimation,
  NumberSystemExplorer,
  BitSwitches,
  BinaryDecimalConverter,
  RegisterBits,
  TwosComplement,
  IntegerCycle,
  CodeSnippet,
  CodeSandpack,
  ImageSlider,
  VideoGrid,
  Random,
  Link,
};

import React, { useCallback, useMemo, useState } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { Transforms, createEditor, Range } from "slate";
import isHotkey, { isKeyHotkey } from "is-hotkey";
import { withHistory } from "slate-history";
import Toolbar from "./ToolBar/Toolbar";
import { MarkButton, toggleMark } from "./ToolBar/MarkButton";
import { BlockButton } from "./ToolBar/BlockButton";
import Elements from "./Common/Elements";
import Leaf from "./Common/Leaf";
import { withImages, InsertImageButton } from "./Image/InsertImageButton";
import { withLinks } from "./Link/linkUtilFunctions";
import AddLinkButton from "./Link/AddLinkButton";
import RemoveLinkButton from "./Link/RemoveLinkButton";
import "../styles/editor.css";
import TagContainer from "./Highlight/TagContainer";

// for all rich editor hot keys
const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const MainEditor = () => {
  // to store the styled text as html
  const [value, setValue] = useState(initialValue);

  // renderElement is used to render custom elements
  const renderElement = useCallback((props) => {
    return <Elements {...props} />;
  }, []);

  // to handle rendering leaves
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  // the slate editor object
  const editor = useMemo(
    () => withLinks(withImages(withHistory(withReact(createEditor())))),
    []
  );

  return (
    <div className="editor-container">
      <Slate
        className="rich-editor"
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <Toolbar style={{ width: "90%" }}>
          {/* add all toolbar options */}
          <MarkButton format="bold" icon="format_bold" title="bold" />
          <MarkButton format="italic" icon="format_italic" title="italic" />
          <MarkButton
            format="underline"
            icon="format_underlined"
            title="underline"
          />
          <MarkButton format="code" icon="code" title="code" />
          <BlockButton
            format="heading-one"
            icon="looks_one"
            title="heading 1"
          />
          <BlockButton
            format="heading-two"
            icon="looks_two"
            title="heading 2"
          />
          <BlockButton format="block-quote" icon="format_quote" title="quote" />
          <BlockButton
            format="numbered-list"
            icon="format_list_numbered"
            title="numbered list"
          />
          <BlockButton
            format="bulleted-list"
            icon="format_list_bulleted"
            title="bulletted list"
          />
          <BlockButton
            format="left"
            icon="format_align_left"
            title="left align"
          />
          <BlockButton
            format="center"
            icon="format_align_center"
            title="center align"
          />
          <BlockButton
            format="right"
            icon="format_align_right"
            title="right align"
          />
          <BlockButton
            format="justify"
            icon="format_align_justify"
            title="justify"
          />
          <InsertImageButton title="image" />
          <AddLinkButton title="add link" />
          <RemoveLinkButton title="remove link" />
          <MarkButton
            format="highlight"
            icon="format_color_fill"
            title="highlight"
          />
        </Toolbar>
        {/* the slate editor */}
        <Editable
          className="rich-editor"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          // check if hotkeys are pressed and then toggle the correct option from toolbar
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
            const { selection } = editor;

            if (selection && Range.isCollapsed(selection)) {
              const { nativeEvent } = event;
              if (isKeyHotkey("left", nativeEvent)) {
                event.preventDefault();
                Transforms.move(editor, {
                  unit: "offset",
                  reverse: true,
                });
                return;
              }
              if (isKeyHotkey("right", nativeEvent)) {
                event.preventDefault();
                Transforms.move(editor, { unit: "offset" });
                return;
              }
            }
          }}
        />
      </Slate>
      <TagContainer />
    </div>
  );
};

// to display some intial text
const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassages of Lorem Ipsum available, but the majority have salteration in some form, by injected humour, or randomised wowhich don't look even slightly believable. If you are going to use a passage. There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassages of Lorem Ipsum available, but the majority have salteration in some form, by injected humour, or randowowhich don't look even slightly believable. If you are going to use a passage.",
      },
    ],
  },
];

export default MainEditor;

import { Flex } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { ImageUploader } from "../components/ImageUploader";
import { TextBox } from "../components/TextBox";

const DEFAULT_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus, neque commodo mattis vehicula, leo dolor fermentum ligula, sit amet.\n\nNulla vitae hendrerit quam. Etiam imperdiet aliquam eleifend. Praesent pulvinar urna id nisl rhoncus tristique. Aenean cursus elit quam, id dictum dolor porttitor quis. Duis.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin.";

const NUM_TEXTBOXES = 2;

export const Home = () => {
  const [text, setText] = useState<string[]>(
    sessionStorage.getItem("snapwrite_text")
      ? JSON.parse(sessionStorage.getItem("snapwrite_text")!)
      : []
  );

  const [imageUrl, setImageUrl] = useState<string | undefined>(
    sessionStorage.getItem("snapwrite_imageURL") || undefined
  );

  useEffect(() => {
    if (!sessionStorage.getItem("snapwrite_text")) {
      const _text = [];
      for (let i = 0; i < NUM_TEXTBOXES; i++) _text.push(DEFAULT_TEXT);
      sessionStorage.setItem("snapwrite_text", JSON.stringify(_text));
      setText(_text);
    }
  }, []);

  useEffect(() => {
    debounce(() => {
      sessionStorage.setItem("snapwrite_text", JSON.stringify(text));
    }, 500)();
  }, [...text]);

  useEffect(() => {
    if (imageUrl) {
      sessionStorage.setItem("snapwrite_imageURL", imageUrl);
    } else {
      sessionStorage.removeItem("snapwrite_imageURL");
    }
  }, [imageUrl]);

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      width="100vw"
      gap="3.75em"
      data-testId="home-page"
    >
      <ImageUploader imageUrl={imageUrl} onChangeImageUrl={setImageUrl} />
      <Flex direction="column" gap="1.2em">
        {text.map((str, i) => (
          <TextBox
            key={i}
            value={str}
            onChange={(newStr) => {
              const _text = text.slice();
              _text[i] = newStr;
              setText(_text);
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};

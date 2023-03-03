import { Flex } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { ImageUploader } from "../components/ImageUploader";
import { TextBox } from "../components/TextBox";

const DEFAULT_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus, neque commodo mattis vehicula, leo dolor fermentum ligula, sit amet.\n\nNulla vitae hendrerit quam. Etiam imperdiet aliquam eleifend. Praesent pulvinar urna id nisl rhoncus tristique. Aenean cursus elit quam, id dictum dolor porttitor quis. Duis.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin.";

export const Home = () => {
  const [topText, setTopText] = useState<string>(
    sessionStorage.getItem("snapwrite_topText") || DEFAULT_TEXT
  );
  const [bottomText, setBottomText] = useState<string>(
    sessionStorage.getItem("snapwrite_bottomText") || DEFAULT_TEXT
  );
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    sessionStorage.getItem("snapwrite_imageURL") || undefined
  );

  useEffect(() => {
    debounce(() => {
      sessionStorage.setItem("snapwrite_topText", topText);
    }, 500)();
  }, [topText]);

  useEffect(() => {
    debounce(() => {
      sessionStorage.setItem("snapwrite_bottomText", bottomText);
    }, 500)();
  }, [bottomText]);

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
        <TextBox value={topText} onChange={setTopText} />
        <TextBox value={bottomText} onChange={setBottomText} />
      </Flex>
    </Flex>
  );
};

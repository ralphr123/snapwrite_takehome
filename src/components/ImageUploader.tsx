import { Flex, FormLabel, Image, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import UploadIcon from "../assets/upload-icon.png";

const BG_COLOR_RESTING = "#ffffff";
const BG_COLOR_HOVER = "#fafafa";

interface Props {
  imageUrl?: string;
  onChangeImageUrl?: (imageUrl?: string) => void;
}

export const ImageUploader = ({ imageUrl, onChangeImageUrl }: Props) => {
  const [bgColor, setBgColor] = useState<string>(BG_COLOR_RESTING);

  const handleSetImageUrl = (imageFile?: File) => {
    const allowedFileTypes = new Set(["image/jpeg", "image/png"]);
    if (!imageFile || !allowedFileTypes.has(imageFile?.type ?? "")) {
      onChangeImageUrl?.(undefined);
    } else {
      onChangeImageUrl?.(URL.createObjectURL(imageFile));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSetImageUrl(e.target.files?.[0]);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setBgColor(BG_COLOR_RESTING);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setBgColor(BG_COLOR_HOVER);
  };

  const handleDropFile = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    handleSetImageUrl(e.dataTransfer.files?.[0]);
    setBgColor(BG_COLOR_RESTING);
  };

  return (
    <Flex>
      <FormLabel
        htmlFor="file-upload"
        className="custom-file-upload"
        width="18em"
        height="18em"
        bgColor={bgColor}
        rounded="md"
        margin="0"
        boxShadow="0 0 10px #dbdbdb"
        _hover={{ bgColor: BG_COLOR_HOVER, cursor: "pointer" }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDropFile}
      >
        {imageUrl ? (
          <Image src={imageUrl} height="100%" width="100%" />
        ) : (
          <Flex
            flexDirection="column"
            align="center"
            width="100%"
            height="100%"
            justifyContent="center"
          >
            <Image src={UploadIcon} height="40px" width="40px" />
            <Text fontFamily="arial" fontSize="13px" color="#626d75">
              PNG, JPEG files only
            </Text>
          </Flex>
        )}
      </FormLabel>
      <Input
        type="file"
        id="file-upload"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        hidden
      />
    </Flex>
  );
};

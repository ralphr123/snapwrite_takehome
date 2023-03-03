import { Flex, Textarea } from "@chakra-ui/react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const TextBox = ({ value, onChange }: Props) => {
  return (
    <Flex
      direction="column"
      width="28em"
      height="18em"
      boxShadow="0 0 10px #dbdbdb"
      borderRadius="5px"
      overflow="hidden"
    >
      <Flex
        align="center"
        borderBottom="1px solid #ebefe5"
        flex={1}
        padding="0.2em .75em"
        fontFamily="arial"
      >
        Text Box
      </Flex>
      <Textarea
        flex={4}
        border="none"
        resize="none"
        boxShadow="inset 0px 5px 2px -2px #f4fc74"
        outline="none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        padding="1em 1.25em"
        fontFamily="arial"
        fontSize="14px"
      />
      <Flex align="center" borderTop="1px solid #ebefe5" flex={1.4}></Flex>
    </Flex>
  );
};

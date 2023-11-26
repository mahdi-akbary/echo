import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  Grid,
  View,
  Image,
  Text,
  TextBlock,
  GridItem,
  BlockStack,
  Style,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  let title = "Love my tee!"
  let review_number = "5"
  let review_content = "Comfy, stylish, eco-friendly tee. Love the quality and unique designs! 🌟"
  let review_author = "Jane Doe"


  return (
    <View padding='tight' border="base" cornerRadius="base">
      <Grid
          columns={['8%', 'auto', 'auto', 'fill']}
          blockAlignment="center"
          rows={[32, 'auto']}
          spacing="tight"
        >
        <View border="none" padding="extraTight">
          {/* Render svg icon as image source */}
            <Image source="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHNoYXBlLXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCA1MTIgMzc5LjUxIj48cGF0aCBkPSJNMjEyLjI3IDMzLjk4QzEzMS4wMiA1Ni41MiA3OC4xNCAxMDMuNjUgNjQuOTkgMTg1LjY3Yy0zLjU4IDIyLjMyIDEuNDIgNS40NiAxNi41NS01Ljg2IDQ5LjQtMzYuOTYgMTQ2LjUzLTIzLjg4IDE2MC4wMSA2MC41NiAyNy4xMiAxNDkuNDgtMTU5Ljc5IDE3NS4zNi0yMTUuMTEgOTIuOC0xMi44Ny0xOS4xOS0yMS4zOS00MS41OS0yNC40Ni02Ni4xOUMtMTEuMzUgMTU5Ljk5IDQzLjQ4IDY0LjcgMTM5LjggMTkuOTRjMTcuODItOC4yOCAzNi42LTE0Ljc2IDU2LjgxLTE5LjUxIDEwLjEyLTIuMDUgMTcuNDcgMy40NiAyMC44NiAxMi43NyAyLjg3IDcuOTUgMy44NSAxNi43Mi01LjIgMjAuNzh6bTI2Ny43OCAwYy04MS4yNSAyMi41NC0xMzQuMTQgNjkuNjctMTQ3LjI4IDE1MS42OS0zLjU4IDIyLjMyIDEuNDIgNS40NiAxNi41NS01Ljg2IDQ5LjQtMzYuOTYgMTQ2LjUzLTIzLjg4IDE2MCA2MC41NiAyNy4xMyAxNDkuNDgtMTU5Ljc4IDE3NS4zNi0yMTUuMSA5Mi44LTEyLjg3LTE5LjE5LTIxLjM5LTQxLjU5LTI0LjQ2LTY2LjE5QzI1Ni40MyAxNTkuOTkgMzExLjI1IDY0LjcgNDA3LjU4IDE5Ljk0IDQyNS40IDExLjY2IDQ0NC4xNyA1LjE4IDQ2NC4zOS40M2MxMC4xMi0yLjA1IDE3LjQ3IDMuNDYgMjAuODYgMTIuNzcgMi44NyA3Ljk1IDMuODUgMTYuNzItNS4yIDIwLjc4eiIvPjwvc3ZnPg==" />
        </View>

        <Image source="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMjQiIHdpZHRoPSIxMDAiIGhlaWdodD0iMjAiIGZpbGw9ImN1cnJlbnRDb2xvciI+DQogIDxwb2x5Z29uIHBvaW50cz0iMTIgMiAxNS4wOSA4LjI2IDIyIDkuMjcgMTcgMTQuMTQgMTguMTggMjEuMDIgMTIgMTcuNzcgNS44MiAyMS4wMiA3IDE0LjE0IDIgOS4yNyA4LjkxIDguMjYgMTIgMiIgLz4NCiAgPHBvbHlnb24gcG9pbnRzPSIzNiAyIDM5LjA5IDguMjYgNDYgOS4yNyA0MSAxNC4xNCA0Mi4xOCAyMS4wMiAzNiAxNy43NyAyOS44MiAyMS4wMiAzMSAxNC4xNCAyNiA5LjI3IDMyLjkxIDguMjYgMzYgMiIgLz4NCiAgPHBvbHlnb24gcG9pbnRzPSI2MCAyIDYzLjA5IDguMjYgNzAgOS4yNyA2NSAxNC4xNCA2Ni4xOCAyMS4wMiA2MCAxNy43NyA1My44MiAyMS4wMiA1NSAxNC4xNCA1MCA5LjI3IDU2LjkxIDguMjYgNjAgMiIgLz4NCiAgPHBvbHlnb24gcG9pbnRzPSI4NCAyIDg3LjA5IDguMjYgOTQgOS4yNyA4OSAxNC4xNCA5MC4xOCAyMS4wMiA4NCAxNy43NyA3Ny44MiAyMS4wMiA3OSAxNC4xNCA3NCA5LjI3IDgwLjkxIDguMjYgODQgMiIgLz4NCiAgPHBvbHlnb24gcG9pbnRzPSIxMDggMiAxMTEuMDkgOC4yNiAxMTggOS4yNyAxMTMgMTQuMTQgMTE0LjE4IDIxLjAyIDEwOCAxNy43NyAxMDEuODIgMjEuMDIgMTAzIDE0LjE0IDk4IDkuMjcgMTA0LjkxIDguMjYgMTA4IDIiIC8+DQo8L3N2Zz4NCg==" />

        <Text emphasis="bold">
          { review_number }
        </Text>

        <Text emphasis="bold">
            { title }
        </Text>

        <GridItem columnSpan={4}>

          <Grid columns={['10%', 'fill' ]}>
            <View border="none" padding="base">
              
            </View>
            <BlockStack spacing="tight">
              <TextBlock appearance="subdued">
                { review_content }
              </TextBlock>

              <Text emphasis="bold">
                { review_author }
              </Text>

            </BlockStack>

          </Grid>

        </GridItem>

      </Grid>

    </View>
  );
}
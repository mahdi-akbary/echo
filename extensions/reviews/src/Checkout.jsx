import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  Grid,
  View,
  Image,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();

  return (
    <View padding='tight' border="base" cornerRadius="base">
      <Grid
          columns={['8%', 'fill', 'auto']}
          rows={[50, 'auto']}
          spacing="base"
        >

        <View border="none" padding="extraTight">
          {/* Render svg icon as image source */}
            <Image source="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHNoYXBlLXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCA1MTIgMzc5LjUxIj48cGF0aCBkPSJNMjEyLjI3IDMzLjk4QzEzMS4wMiA1Ni41MiA3OC4xNCAxMDMuNjUgNjQuOTkgMTg1LjY3Yy0zLjU4IDIyLjMyIDEuNDIgNS40NiAxNi41NS01Ljg2IDQ5LjQtMzYuOTYgMTQ2LjUzLTIzLjg4IDE2MC4wMSA2MC41NiAyNy4xMiAxNDkuNDgtMTU5Ljc5IDE3NS4zNi0yMTUuMTEgOTIuOC0xMi44Ny0xOS4xOS0yMS4zOS00MS41OS0yNC40Ni02Ni4xOUMtMTEuMzUgMTU5Ljk5IDQzLjQ4IDY0LjcgMTM5LjggMTkuOTRjMTcuODItOC4yOCAzNi42LTE0Ljc2IDU2LjgxLTE5LjUxIDEwLjEyLTIuMDUgMTcuNDcgMy40NiAyMC44NiAxMi43NyAyLjg3IDcuOTUgMy44NSAxNi43Mi01LjIgMjAuNzh6bTI2Ny43OCAwYy04MS4yNSAyMi41NC0xMzQuMTQgNjkuNjctMTQ3LjI4IDE1MS42OS0zLjU4IDIyLjMyIDEuNDIgNS40NiAxNi41NS01Ljg2IDQ5LjQtMzYuOTYgMTQ2LjUzLTIzLjg4IDE2MCA2MC41NiAyNy4xMyAxNDkuNDgtMTU5Ljc4IDE3NS4zNi0yMTUuMSA5Mi44LTEyLjg3LTE5LjE5LTIxLjM5LTQxLjU5LTI0LjQ2LTY2LjE5QzI1Ni40MyAxNTkuOTkgMzExLjI1IDY0LjcgNDA3LjU4IDE5Ljk0IDQyNS40IDExLjY2IDQ0NC4xNyA1LjE4IDQ2NC4zOS40M2MxMC4xMi0yLjA1IDE3LjQ3IDMuNDYgMjAuODYgMTIuNzcgMi44NyA3Ljk1IDMuODUgMTYuNzItNS4yIDIwLjc4eiIvPjwvc3ZnPg==" />
        </View>

        <View border="base" padding="base">
          fill / 300
        </View>

        <View border="base" padding="base">
          auto / 300
        </View>
        <View border="base" padding="base">
          20% / auto
        </View>
        <View border="base" padding="base">
          fill / auto
        </View>
        <View border="base" padding="base">
          auto / auto
        </View>
      </Grid>

    </View>
  );
}
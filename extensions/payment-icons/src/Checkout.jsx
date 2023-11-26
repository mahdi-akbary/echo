import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  PaymentIcon,
  Grid,
  useSettings,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const { title, icons, grid } = useSettings();


  let icons_name = icons || "visa,mastercard,amex,discover"
  icons_name = icons_name.split(",")
  let grid_columns = ""
  if(grid == '2 columns'){
    grid_columns = "auto,auto"
  }else if(grid == '3 columns'){
    grid_columns = "auto,auto,auto"
  } else if(grid == '4 columns'){
    grid_columns = "auto,auto,auto,auto"
  } else if(grid == '5 columns'){
    grid_columns = "auto,auto,auto,auto,auto"
  } else if(grid == '6 columns'){
    grid_columns = "auto,auto,auto,auto,auto,auto"
  } else if (grid == '7 columns'){
    grid_columns = "auto,auto,auto,auto,auto,auto,auto"
  } else if (grid == '8 columns'){
    grid_columns = "auto,auto,auto,auto,auto,auto,auto,auto"
  } else if (grid == '9 columns'){
    grid_columns = "auto,auto,auto,auto,auto,auto,auto,auto,auto"
  } else if (grid == '10 columns'){
    grid_columns = "auto,auto,auto,auto,auto,auto,auto,auto,auto,auto"
  }else{
    grid_columns = "auto,auto,auto,auto"
  }
  
  return (
      <Grid spacing="base" columns={[grid_columns]}> 
          {/* Loop through icons_name and render */}
          {icons_name.map((icon_name) => (
              <PaymentIcon name={icon_name} accessibilityLabel={icon_name} />
          ))}
      </Grid>
  );
}
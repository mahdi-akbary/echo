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
  let { icons, grid, spacing } = useSettings();

  
  let icons_name = icons || "visa,mastercard,amex,discover"
  icons = 'visa, mastercard'

  icons_name = icons_name.replace(/\s/g, '');
  icons_name = icons_name.split(",")

  let icon_spacing = spacing || "base"

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
  grid_columns = grid_columns.split(",");
  
  return (
      <Grid spacing={icon_spacing} columns={grid_columns}> 
          {/* Loop through icons_name and render */}
          {icons_name.map((icon_name) => (
              <PaymentIcon name={icon_name} key={icon_name} accessibilityLabel={icon_name} />
          ))}
      </Grid>
  );
}

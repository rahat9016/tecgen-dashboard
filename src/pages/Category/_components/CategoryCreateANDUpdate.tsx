import { Box, Button, Divider } from '@mui/material'
import { useDispatch } from 'react-redux'
import ImageField from '../../../components/ImageField'
import InputField from '../../../components/InputField'
import SwitchField from '../../../components/modals/Switch'
import { setOpen } from '../../../redux/feature/open/openSlice'

export default function CategoryCreateANDUpdate({
  handleSubmit,
  handleChange,
  handleChecked,
  categoryInfo,
  errors,
  buttonValue = 'Create'
}: any) {
  const dispatch = useDispatch()
  console.log(errors)
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
      onSubmit={handleSubmit}
    >
      <InputField
        name="name"
        label="Category Name"
        placeholder="Enter category name"
        required
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
        }}
      >
        <SwitchField
          onChange={handleChecked}
          name="is_active"
          labelOfChecked="Is Active"
          value={categoryInfo.is_active}
          // required
        />
        <Divider />
        <SwitchField
          onChange={handleChecked}
          name="show_in_ecommerce"
          labelOfChecked="Show in Ecommerce"
          value={categoryInfo.show_in_ecommerce}
        />
      </Box>
      <ImageField label="Upload Icon" />
      <ImageField label="Upload Logo" />
      
      <Box
          pl={4}
          pr={4}
          pb={4}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(setOpen(!open))}
          >
            Close
          </Button>
          {<Button type="submit" variant="contained" color="primary">
            {buttonValue}
          </Button>}
        </Box>
    </Box>
  )
}

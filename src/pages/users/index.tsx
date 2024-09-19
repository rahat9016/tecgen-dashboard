/* eslint-disable @typescript-eslint/no-explicit-any */
import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  styled,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { GridSearchIcon } from '@mui/x-data-grid'
import { SetStateAction, useEffect, useState } from 'react'



import DataTable from './_component/Table'
// import { CREATE_ACTION } from './constant'
import UsersModal from '../../components/modals/UserModal'
import { setText } from '../../redux/feature/search/searchSlice'
import { useGetBranchQuery, useGetRolesQuery } from '../../redux/feature/user/userApi'
import { setSelectUserAction } from '../../redux/feature/user/userSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import useDebounce from '../../utils/useDebounce'



export default function Users() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const theme: Theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { data: branch } = useGetBranchQuery(undefined)
    const { data: roles } = useGetRolesQuery(undefined)
  const [selectedRow, setSelectedRow] = useState<any>(null)

  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // Use the custom hook
  const dispatch = useAppDispatch()
  const { text } = useAppSelector(state => state.search)
  useEffect(() => {
    dispatch(setText(debouncedSearchTerm))
  }, [debouncedSearchTerm])
  // Handle search input change
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSearchTerm(event.target.value)
  }

  const ProductButton = styled(Button)({
    textTransform: 'none',
    fontSize: 14,
    padding: '6px 12px',

    lineHeight: 1.5,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
    },
    color: 'white',
    margin: isSmallScreen ? '5px 0' : '10px 0',
  })
  return (
    <Box
      className="lotList"
      sx={{
        background:
          theme?.palette?.mode === 'dark'
            ? '#202020'
            : 'rgba(255, 255, 255, 1)',
        padding: '33px 24px',
        borderRadius: '8px',
      }}
    >
      <Typography variant="subtitle1" style={{ fontWeight: 500 }}>
        User List
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'space-between',
        }}
      >
        {isSmallScreen ? (
          <Grid
            container
            spacing={2}
            sx={{ marginBottom: isSmallScreen ? '5px 0' : '16px 0' }}
          >
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                fullWidth
                placeholder="Search"
                value={searchTerm} // Bind search term state to input
                onChange={handleSearchChange} // Update search term state on input change
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GridSearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  padding: '2px 0',
                  background:
                    theme.palette.mode === 'dark'
                      ? 'rgba(57, 57, 57, 1)'
                      : 'rgba(239, 243, 244, 1)',
                  borderColor: 'transparent',
                  borderRadius: '8px',
                }}
              />
            </Grid>
          </Grid>
        ) : (
          <div></div>
        )}
        <ProductButton
          startIcon={<AddIcon />}
          onClick={() => {
            dispatch(setSelectUserAction('CREATE'))
            setIsOpen(true)
          }}
          // sx={{
          //   backgroundColor:
          //     theme.palette.mode === 'dark'
          //       ? theme.palette.primary.main
          //       : theme.palette.secondary.main,
          //   '&:hover': {
          //     backgroundColor:
          //       theme.palette.mode === 'dark'
          //         ? theme.palette.primary.main
          //         : theme.palette.secondary.main,
          //   },
          //   color: 'white',
          //   margin: isSmallScreen ? '5px 0' : '10px 0',
          // "&.css-t54gau-MuiButtonBase-root-MuiButton-root":{
          //   textTransform:"capitalize"
          // }
          // }}
        >
          Create
        </ProductButton>
      </Box>
      <DataTable
        text={text}
        setIsOpen={setIsOpen}
        setSelectedRow={setSelectedRow}
        selectedRow={selectedRow}
      />
      {isOpen && (
        <UsersModal
        //   updateLocation={updateLocation}
        //   createLocation={createLocation}
        branch={branch}
        roles={roles}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedRow={selectedRow}
        />
      )}
    </Box>
  )
}

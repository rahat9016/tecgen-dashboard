import { Box } from '@mui/material'
import { useState } from 'react'
import ModalView from '../../components/modals/Modal'
import Table from '../../components/table/Table'
import TableHeader from '../../components/table/TableHeader'
import CategoryColumn from './_components/CategoryColumn'
import CategoryCreateANDUpdate from './_components/CategoryCreateANDUpdate'
import { ICategoryInfo, ICategoryInfoError } from './types/types'



export default function Category() {
  // const { data } = useGetCategoryQuery(undefined)
  const [errors, setErrors] = useState<ICategoryInfoError>({})
  const [categoryInfo, setCategoryInfo] = useState<ICategoryInfo>({
    name: '',
    images: [],
    is_active: false,
    show_in_ecommerce: false,
  })

  // handle change function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInfo({ ...categoryInfo, [e.target.name]: e.target.value })
    setErrors({
      ...errors,
      [e.target.name]: '',
    })
  }
  // handle checked function
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInfo({ ...categoryInfo, [e.target.name]: e.target.checked })
  }

  const validateForm = () => {
    let errors: {
      name: string | null | undefined
    } = {
      name: undefined,
    }

    if (!categoryInfo.name) {
      errors.name = 'Category name is required'
    }
    setErrors(errors)

    const hasErrors = Object.values(errors).some(error => error !== undefined)
    return !hasErrors
  }

  // handle submit function
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    console.log('ok')
    if (validateForm()) {
    }
  }

  return (
    <Box
      sx={{
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? 'rgba(32, 32, 32, 1)' : ' white',
        padding: '16px',
      }}
    >
      <TableHeader tableTitle="Category List" />
      <Table columns={CategoryColumn()} />
      <ModalView headerTitle="Create category">
        <CategoryCreateANDUpdate
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleChecked={handleChecked}
          categoryInfo={categoryInfo}
          setCategoryInfo={setCategoryInfo}
          errors={errors}
        />
      </ModalView>
    </Box>
  )
}

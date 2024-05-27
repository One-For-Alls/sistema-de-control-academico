const prisma = require('../models/prisma.js')

const getAllRolesService = async () => {
  const roles = await prisma.roles.findMany()

  if (!roles) {
    return {
      status: 404,
      message: 'No existe ningun rol'
    }
  }

  return {
    status: 200,
    data: [...roles]
  }
}

const getRolesServiceById = async ({ id }) => {
  const roles = await prisma.roles.findUnique({
    where: { id }
  })

  if (!roles) {
    return {
      status: 404,
      message: 'No existe ningun rol'
    }
  }

  return {
    status: 200,
    data: roles
  }
}
const saveRolesService = async ({ name }) => {
  const roles = await prisma.roles.findUnique({
    where: { name }
  })

  if (roles) {
    return {
      status: 404,
      message: 'El rol ya existe'
    }
  }
  const newRol = await prisma.roles.create({
    data: { name }
  })
  return {
    status: 201,
    data: newRol
  }
}

const updateRolesServiceById = async ({ id, name }) => {
  console.log(id)

  const roles = await prisma.roles.findFirst({
    where: { name }
  })

  if (roles) {
    return {
      status: 404,
      message: 'El nombre del rol ya existe'
    }
  }

  const updateRol = await prisma.roles.update({
    where: { id },
    data: { name }
  })
  return {
    status: 201,
    message: 'nombre de rol actualizado',
    data: updateRol
  }
}

module.exports = { saveRolesService, getAllRolesService, getRolesServiceById, updateRolesServiceById }

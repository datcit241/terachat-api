function getUserDTO(user) {
  return {id: user.id, email: user.email, displayName: user.displayName}
}

module.exports = getUserDTO;

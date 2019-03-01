import bcrypt from 'bcrypt';

export const hash = (password: string) => new Promise(resolve => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    resolve(hash);
  })
})

export const compare = async (password: string, hashed: string) => {
  return hashed === await hash(password);
}

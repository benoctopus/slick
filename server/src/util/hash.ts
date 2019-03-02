import * as bcrypt from 'bcrypt';

export const hash = (password: string): Promise<string> => new Promise(resolve => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    resolve(hash);
  })
})

export const compare = (password: string, hashed: string): Promise<boolean> => new Promise<boolean>(async resolve => {
  bcrypt.compare(password, hashed, (err, same) => {
    if (err) throw err;
    resolve(same);
  })
})

import "multer";

export interface UserWithFiles {
  avatar?: Express.Multer.File[],
  backgroundImage?: Express.Multer.File[]
}

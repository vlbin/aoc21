{-# LANGUAGE TypeApplications #-}
module Utils.Parser where

readInput :: FilePath ->IO String
readInput fp = do
  readFile fp

readInt :: String -> Int 
readInt = read @Int
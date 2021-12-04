import Data.List (sort, maximumBy, transpose, minimumBy)
import Data.List.Compat (group)
import Data.Ord

part1 fp = do
  file <- readFile fp
  let list = lines file
  let gam = binaryToDec $ gamma list
  let eps = binaryToDec $ epsilon list
  return $ eps * gam

part2 fp = do
  file <- readFile fp
  let list = lines file
  let ox = oxygen list
  return ox

oxygen list = oxygen' list 0
  where
    oxygen' [x] i = x
    oxygen' list i =  

gamma :: [[Char]] -> [Char]
gamma list = let sorted = map (group . sort) $ transpose list in
  map (head . maximumBy (comparing length)) sorted

epsilon :: [[Char]] -> [Char]
epsilon list = map flip (gamma list)
  where
    flip bit = if bit == '1' then '0' else '1'

binaryToDec :: String -> Int
binaryToDec num = bintodec $ read num
  where
    bintodec 0 = 0
    bintodec i = 2 * bintodec (div i 10) + mod i 10


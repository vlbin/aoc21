increasing :: [Int] -> Int
increasing nums = length $ filter (\(a, b) -> b > a) (pairs nums)
  where
    pairs :: [b] -> [(b, b)]
    pairs [] = []
    pairs (n:ns) = zip (n:ns) ns

groupsOfThree' :: [Int] -> [[Int]]
groupsOfThree' (a:b:c:list) = [a,b,c] : groupsOfThree' (b:c:list)
groupsOfThree' _            = []

part1 :: FilePath -> IO ()
part1 file = do
  content <- readFile file
  let nums = [read n | n <- lines content]
  let res = increasing nums
  print res

part2 :: FilePath -> IO () 
part2 file = do
  content <- readFile file
  let nums = [read n | n <- lines content]
  let res = increasing $ map sum $ groupsOfThree' nums
  print res

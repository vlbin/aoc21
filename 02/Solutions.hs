parse path = do
  file <- readFile path
  let list = map words $ lines file
  let tuples = map (\(a:b:_) -> (a, read b :: Int)) list
  return tuples

part1 :: FilePath -> IO ()
part1 path = do
  list <- parse path
  let pos = part1Ins list 0 0
  print (uncurry (*) pos)

part1Ins :: [(String, Int)] -> Int -> Int -> (Int, Int)
part1Ins [] hor dep = (hor, dep)
part1Ins (ins:rest) hor dep =
  case fst ins of
    "forward" -> part1Ins rest (hor + snd ins) dep
    "up"      -> part1Ins rest hor (dep - snd ins)
    "down"    -> part1Ins rest hor (dep + snd ins)
    _         -> part1Ins rest hor dep

-----------------------------

part2 :: FilePath -> IO ()
part2 path = do
  list <- parse path
  let pos = part2Ins list (0,(0,0))
  print $ uncurry (*) $ snd pos

part2Ins :: [(String, Int)] -> (Int, (Int, Int)) -> (Int, (Int, Int))
part2Ins [] (aim, (hor, dep)) = (aim, (hor, dep))
part2Ins (ins:rest) (aim, (hor, dep)) = 
  case fst ins of
    "forward"   -> part2Ins rest (aim, (hor + snd ins, dep + snd ins * aim))
    "up"        -> part2Ins rest (aim - snd ins, (hor, dep))
    "down"      -> part2Ins rest (aim + snd ins, (hor, dep))
    _           -> part2Ins rest (aim, (hor, dep))
(use 'clojure.test)

(defn get-input []
  (slurp "/Users/myrsmeden/Development/adventofcode/2021/01/input.txt"))

(defn get-numbers [] (map #(Integer/parseInt %) (clojure.string/split (get-input) #"\n")))

(defn part1 []
  (->>
   (get-numbers)
   (partition 2 1)
   (map (fn ([[first second]] (< first second))))
   (filter boolean)
   (count)))

(defn part2 []
  (->>
   (get-numbers)
   (partition 3 1)
   (map (fn ([[first second third]] (+ first second third))))
   (partition 2 1)
   (map (fn ([[first second]] (< first second))))
   (filter boolean)
   (count)))

(part1)
(part2)

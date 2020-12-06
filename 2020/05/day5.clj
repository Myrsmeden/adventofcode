(use 'clojure.test)

(defn get-input []
  (slurp "/Users/myrsmeden/Development/adventofcode/2020/05/input.txt"))

(defn get-boardingpasses []
  (clojure.string/split (get-input) #"\n"))

(defn calculate-id [boardingpass]
  (-> boardingpass
    (clojure.string/replace "F" "0")
    (clojure.string/replace "B" "1")
    (clojure.string/replace "L" "0")
    (clojure.string/replace "R" "1")
    (Integer/parseInt 2))
  )

(defn get-ids []
  (map calculate-id (get-boardingpasses)))

(defn part1 [] (apply max (get-ids)))

(defn part2 []
  (->> (get-ids)
       (sort (fn [a b] (- a b)))
       (partition 2 1)
       (map (fn [[a b]]
              (if (= (- b a) 1) nil (- b 1))))
       (remove nil?)))

(part1)
(part2)

(deftest id-calculation 
  (is (= (calculate-id "BFFFBBFRRR") 567))
  (is (= (calculate-id "FFFBBBFRRR") 119))
  (is (= (calculate-id "BBFFBBFRLL") 820)))
(run-all-tests)
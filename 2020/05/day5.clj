(use 'clojure.test)

(defn get-input []
  (slurp "/Users/myrsmeden/Development/adventofcode/2020/05/input.txt"))

(defn get-boardingpasses []
  (clojure.string/split (get-input) #"\n"))

(defn is-first-half? [sequence]
  (->> (first sequence)
       (contains? #{\L \F})))

(defn get-half-index [positions]
  (-> (count positions)
      (/ 2)
      (Math/ceil)))

(defn get-position [positions sequence]
  (if (= (count sequence) 1) (if (is-first-half? sequence) (first positions) (nth positions 1))

      (if (is-first-half? sequence) (get-position (take (get-half-index positions) positions) (rest sequence))
          (get-position (nthrest positions (get-half-index positions)) (rest sequence)))))

(defn get-row [sequence]
  (get-position (range 128) sequence))

(defn get-column [sequence]
  (get-position (range 8) sequence))

(defn calculate-id [boardingpass]
  (+ (* (get-row (take 7 boardingpass)) 8) (get-column (nthrest boardingpass 7))))

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

(deftest first-half
  (is (= (is-first-half? "ABC") false))
  (is (= (is-first-half? "LBC") true))
  (is (= (is-first-half? "FBC") true))
  (is (= (is-first-half? "ABL") false)))

(deftest half-index
  (is (= (get-half-index '(0 1 2 3 4 5 6 7)) 4.0)))

(deftest position
  (is (= (get-position (range 128) "BFFFBBF") 70))
  (is (= (get-position (range 128) "FFFBBBF") 14))
  (is (= (get-position (range 128) "BBFFBBF") 102))
  (is (= (get-position (range 8) "RRR") 7))
  (is (= (get-position (range 8) "RLL") 4)))

(deftest id-calculation 
  (is (= (calculate-id "BFFFBBFRRR") 567))
  (is (= (calculate-id "FFFBBBFRRR") 119))
  (is (= (calculate-id "BBFFBBFRLL") 820)))
(run-all-tests)
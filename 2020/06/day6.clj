(use 'clojure.test)
(require '[clojure.string])

(defn get-input []
  (slurp "/Users/myrsmeden/Development/adventofcode/2020/06/input.txt"))

(defn get-groups [] (clojure.string/split (get-input) #"\n\n"))

(defn count-unique-group [total group]
  (->> (clojure.string/split group #"\n")
       (reduce (fn [items question]
                 (set (concat items  (clojure.string/split (clojure.string/trim question) #"")))) '())
       (count)
       (+ total)))

(defn part1 []
  (reduce count-unique-group 0 (get-groups)))

(part1)

(defn part2 []
  (reduce + (map (fn [group]
                   (->> (clojure.string/split group #"\n")
                        (map set)
                        (reduce clojure.set/intersection)
                        (count))) (get-groups))))

(part2)

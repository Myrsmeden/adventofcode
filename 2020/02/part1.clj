(require '[clojure.string])

(defn get-input []
  (slurp "/Users/myrsmeden/Development/adventofcode/2020/02/input.txt"))

(defn isPasswordValid [line]
  (let [[policy password] (clojure.string/split line #": ")]
    (let [[numberOfTimes letter] (clojure.string/split policy #" ")]
      (let [[minNumberOfTimes maxNumberOfTimes] (map #(Integer/parseInt %) (clojure.string/split numberOfTimes #"-"))]
        (as-> (reduce (fn [count testLetter]
                        (+ count (if (= testLetter letter) 1 0))) 0 (clojure.string/split password #"")) occurrences
              (<= minNumberOfTimes occurrences maxNumberOfTimes))))))

(count (filter isPasswordValid (clojure.string/split (get-input) #"\n")))
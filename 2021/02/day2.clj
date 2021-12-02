(use 'clojure.test)

(defn get-input []
  (slurp "/Users/myrsmeden/Development/adventofcode/2021/02/input.txt"))

(defn parse-input [] (map (fn [input] (clojure.string/split input #" ")) (clojure.string/split (get-input) #"\n")))

(defn move1 [acc [instruction distance]]
  (->
   (update acc :horisontal (fn [old] (if (= instruction "forward") (+ old (Integer/parseInt distance)) old)))
   (update :depth (fn [old] (if (= instruction "down") (+ old (Integer/parseInt distance)) old)))
   (update :depth (fn [old] (if (= instruction "up") (- old (Integer/parseInt distance)) old)))))

(defn move2 [acc [instruction distance]]
  (->
   (update acc :aim (fn [old] (if (= instruction "down") (+ old (Integer/parseInt distance)) old)))
   (update :aim (fn [old] (if (= instruction "up") (- old (Integer/parseInt distance)) old)))
   (update :horisontal (fn [old] (if (= instruction "forward") (+ old (Integer/parseInt distance)) old)))
   (update :depth (fn [old] (if (= instruction "forward") (+ old (* (Integer/parseInt distance) (get acc :aim))) old)))))

(defn part1 []
  (as-> (parse-input) $
    (reduce move1 {:horisontal 0 :depth 0} $)
    (* (get $ :horisontal) (get $ :depth))))

(defn part2 []
  (as-> (parse-input) $
    (reduce move2 {:horisontal 0 :depth 0 :aim 0} $)
    (* (get $ :horisontal) (get $ :depth))))

(part1)
(part2)

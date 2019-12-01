(require '[clojure.java.io :as io])

(defn lines [filename]
  (with-open [rdr (io/reader filename)]
    (doall (line-seq rdr))))

(defn parse-int [number-string]
  (try (Integer/parseInt number-string)
    (catch Exception e nil)))

(do
  (reduce (fn [sum line]
    (+ sum (parse-int line))) 0 (lines "input.txt")))
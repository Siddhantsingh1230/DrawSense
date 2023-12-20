import { dataArray } from "./dataset.js";



class KNNClassifier {
  constructor(point) {
    // not coded yet
  }
  getEucledeanDist = (p1, p2) => {
    // two points p1 and p2
    return Math.sqrt((p2.width - p1.width) ** 2 + (p2.height - p1.height) ** 2);
  };

  predict(point, k) {
    const distances = dataArray.map((dataPoint) => ({
      point: dataPoint,
      distance: this.getEucledeanDist(point, dataPoint),
    }));

    // Sort distances in ascending order
    distances.sort((a, b) => a.distance - b.distance);

    // Select top k points
    const kNearestNeighbors = distances.slice(0, k);

    // Count occurrences of each class in the k nearest neighbors
    const classCount = {};
    kNearestNeighbors.forEach(({ point }) => {
      const label = point.label;
      classCount[label] = (classCount[label] || 0) + 1;
    });
    
    // Find the majority class
    let maxCount = 0;
    let predictedClass = null;
    Object.entries(classCount).forEach(([label, count]) => {
      if (count > maxCount) {
        maxCount = count;
        predictedClass = label;
      }
    });

    return predictedClass;
  }
}

export default KNNClassifier;

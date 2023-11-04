import React from "react";
import "./DescriptionCard.css";

function DescriptionCard() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        paddingTop: "50px",
      }}
    >
      <div class="Dcard">
        <div class="card-inner">
          <div
            class="card-front"
            style={{
              background: "linear-gradient(to bottom, lightgreen, darkgreen)",
            }}
          >
            <h3>Diet type: <i>Cut</i></h3>
          </div>
          <div class="card-back">
            <p>
              A cut diet involves a structured approach to weight loss, focusing
              on reducing body fat while retaining lean muscle. Calorie intake
              is decreased, often with higher protein, lower carbohydrates, fats
              and sugar. Combining exercise, particularly strength training,
              promotes a calorie deficit for fat loss, resulting in a leaner,
              more defined physique.
            </p>
          </div>
        </div>
      </div>

      <div class="Dcard">
        <div class="card-inner">
          <div
            class="card-front"
            style={{
              background: "linear-gradient(to bottom, lightblue, darkblue)",
            }}
          >
            <h3>Diet type: <i>Maintain</i></h3>
          </div>
          <div class="card-back">
            <p>
              A maintenance diet maintains a stable body weight and composition.
              It involves consuming a balanced number of calories to support
              daily energy needs. Protein, carbohydrates, and fats are balanced
              to sustain muscle and overall health. This approach helps
              individuals sustain their current physique and energy levels
              without significant weight gain or loss.
            </p>
          </div>
        </div>
      </div>

      <div class="Dcard">
        <div class="card-inner">
          <div
            class="card-front"
            style={{
              background: "linear-gradient(to bottom, lightcoral, darkred)",
            }}
          >
            <h3>Diet type: <i>Bulk</i></h3>
          </div>
          <div class="card-back">
            <p>
              A bulk diet focuses on increasing calorie intake to promote muscle
              growth and weight gain. It typically involves a surplus of
              calories, with an emphasis on higher protein and carbohydrates.
              Strength training is essential to utilize the additional calories
              for muscle development. The goal is to achieve a muscular and
              larger physique.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionCard;

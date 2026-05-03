export class LevelUpUI {
  constructor() {
    this.screen = document.getElementById("levelup-screen");
    this.container = document.getElementById("levelup-options");
  }

  show(choices, onSelect) {
    this.container.innerHTML = "";

    for (const choice of choices) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-card";
      button.innerHTML = `
        <div class="option-card-header">
          <span class="option-type">${choice.typeLabel ?? ""}</span>
          <strong>${choice.title}</strong>
        </div>
        <p>${choice.description}</p>
      `;
      button.addEventListener("click", () => onSelect(choice));
      this.container.append(button);
    }

    this.screen.classList.remove("hidden");
    this.screen.classList.add("visible");
  }

  hide() {
    this.screen.classList.add("hidden");
    this.screen.classList.remove("visible");
  }
}

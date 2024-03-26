let select = document.querySelector('select');
        select.addEventListener("change", function () {
            if (this.value === "") {
                this.classList.add("placeholder");
            } else {
                this.classList.remove("placeholder");
            }
        });
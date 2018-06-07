function roll_die(max) {
    return 1 + Math.floor(Math.random() * Math.floor(max));
}

function random_element(arr) {
    return arr[Math.floor(Math.random() * Math.floor(arr.length))];
}


function roll_all_dice(number, dice_type, bonus) {
    let sum = 0;
    let crit_status = "None";

    for (let x = 0; x < number; x++) {
        sum += roll_die(dice_type);
    }

    // handle critical failure + success
    if (number == 1 && dice_type == 20) {
        if (sum == 20) {
            crit_status = "Success";
        }
        if (sum == 1) {
            crit_status = "Failure";
        }
    }

    sum += bonus;

    return {result : sum, crit : crit_status};
}


function draw_crit_success () {
    let success_effects = [
        "Your enemy loses a limb and gains disadvantage to every action using it! It also takes 1d3 bleeding damage every round.",
        "You decapitate your enemy"
    ];

    return random_element(success_effects);
}

function draw_crit_fail () {
    let fail_effects = [
        "You lose a limb and gains disadvantage to every action using it! You also takes 1d3 bleeding damage every round until healed.",
        "You slip over in spilt blood and go prone!"
    ];

    return random_element(fail_effects);
}


document.getElementById('roll-button').onclick = function () {
    document.getElementById("succ-overlay").style.setProperty('display', 'block');
    document.getElementById("fail-overlay").style.setProperty('display', 'block');
    
    let result = roll_all_dice(
                    parseInt(document.getElementById('number-of-dice').value),
                    parseInt(document.getElementById('dice-type').value),
                    parseInt(document.getElementById('dice-bonus').value)
                 )

    document.getElementById('last-result').innerHTML = result.result;

    if (result.crit == "Failure") {
        console.log("Critical failure");
        document.getElementById("fail-overlay").style.setProperty('display', 'none');
    } else if (result.crit == "Success") {
        console.log("Critical success");
        document.getElementById("succ-overlay").style.setProperty('display', 'none');
    }
}

document.getElementById("crit-succ").onclick = function () {
    let success_effect = draw_crit_success();

    alert(success_effect);

    document.getElementById("succ-overlay").style.setProperty('display', 'block');
}

document.getElementById("crit-fail").onclick = function () {
    let fail_effect = draw_crit_fail();

    alert(fail_effect);

    document.getElementById("fail-overlay").style.setProperty('display', 'block');
}
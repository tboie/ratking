import "./entity-content.scss";

// Router Route
import { Route } from "react-router-dom";
import { useEffect, useRef } from "react";

const Content = () => {
  let ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /*
    // scroll div on document scroll wheel event
    document.addEventListener(
      "wheel",
      (event) => ref.current && (ref.current.scrollTop += event.deltaY)
    );
    */
  }, []);

  return (
    <div ref={ref} className="entity-content">
      <Route exact path="/">
        <span>Home</span>
      </Route>
      <Route exact path="/news">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
          magna quam. Maecenas vel lacus nec nisl pharetra mattis pellentesque
          ut tellus. Mauris congue luctus enim. Mauris ornare massa at dignissim
          vulputate. Quisque libero dolor, feugiat ac vulputate non, efficitur
          at nisl. Phasellus varius risus mattis euismod iaculis. Cras vel
          accumsan urna. Pellentesque mauris justo, rhoncus sed mauris et, porta
          viverra diam. Praesent sed est elit. Nullam pellentesque laoreet
          lobortis. Proin at nisl venenatis, finibus quam maximus, tincidunt
          urna. Proin ac finibus tellus. Praesent in justo mi. Phasellus sem
          nibh, posuere sed arcu quis, maximus ultrices eros. Aenean dignissim
          vitae odio ac feugiat. Aliquam erat volutpat. Nulla facilisi. Sed
          accumsan sagittis turpis, porta feugiat magna feugiat ut. Maecenas
          egestas libero sed dolor tempus tincidunt. Aenean et lacus posuere,
          tincidunt urna nec, aliquam dui. Donec dapibus fringilla dolor, eget
          imperdiet metus. Aliquam non vestibulum dolor. Suspendisse varius,
          risus a suscipit tempor, leo odio efficitur urna, sed elementum odio
          eros eget felis. Sed id rhoncus purus, sed scelerisque diam. In hac
          habitasse platea dictumst. Ut luctus sit amet ex et lacinia. Aliquam
          suscipit in dui sit amet tristique. Suspendisse metus urna, viverra ac
          dui vitae, egestas rutrum lacus. Sed ultricies vestibulum mauris, non
          imperdiet turpis facilisis vel. Ut et condimentum mauris, et semper
          tellus. Aliquam magna lacus, lacinia sed posuere at, facilisis in
          nunc. Curabitur volutpat fermentum tellus ac laoreet. Nulla risus
          nibh, commodo vel metus in, hendrerit lobortis dui. Nam rhoncus sem
          malesuada, tincidunt nibh sed, molestie purus. Suspendisse eros odio,
          rhoncus eget mi eget, aliquam ornare velit. Sed at pretium risus, eu
          sollicitudin nisi. Curabitur vitae augue consequat lorem maximus
          efficitur ut et augue. Vestibulum maximus varius justo vitae sagittis.
          In maximus turpis diam, nec porta arcu vehicula feugiat. Morbi quam
          diam, dignissim ac velit vitae, tincidunt pellentesque magna. Fusce in
          mi id magna hendrerit congue. Mauris non tempus ipsum. Quisque
          hendrerit at velit id aliquet. Donec tortor enim, ullamcorper a lacus
          eu, congue lobortis risus. Nulla ac dapibus lacus, non semper nisi.
          Vestibulum et mi est. Suspendisse imperdiet id lectus et mattis. Ut at
          lorem arcu. Vivamus lacus metus, tempus in volutpat in, tempor
          suscipit mauris. Nunc sodales egestas maximus. In libero velit,
          fringilla eget leo non, bibendum luctus nunc. Nulla fermentum
          dignissim risus, nec sodales nulla sollicitudin vitae. Integer
          convallis eu odio nec malesuada. Nulla egestas pharetra nisl a
          porttitor. Integer convallis egestas mauris nec iaculis. Curabitur et
          leo ut ex egestas sollicitudin. Praesent iaculis ipsum sit amet
          sollicitudin porttitor. Nullam ac metus sed neque pellentesque congue.
          Duis semper ornare iaculis. Aliquam eget turpis hendrerit, fermentum
          mauris sit amet, consequat ligula. Aliquam cursus ipsum luctus turpis
          fermentum scelerisque. Nunc massa ante, mattis nec faucibus non,
          aliquam sit amet sapien. Nam dictum nunc tortor, quis luctus magna
          tristique vitae. Cras elementum leo ligula, vel ornare mauris ultrices
          non. Sed efficitur orci nec elit porta, eu iaculis est tincidunt.
          Vestibulum id pellentesque lacus, ut vestibulum magna. Vivamus mattis
          dolor quis nunc varius vehicula. Donec vitae tortor pharetra risus
          imperdiet rutrum ut eget velit. Sed quis elit tempus, pharetra erat
          non, laoreet enim. Proin ac elementum nulla, at efficitur lorem. Etiam
          quis viverra neque. Pellentesque mattis dapibus elementum. Phasellus
          in accumsan sapien. Duis vitae nisi massa. Pellentesque a aliquet
          nisl. Nunc malesuada purus et ipsum mattis porttitor. Phasellus eros
          nulla, malesuada id suscipit eu, sodales vel tortor. Proin vitae
          elementum turpis, nec posuere massa. Nunc lorem risus, porta ut
          iaculis eu, feugiat ut nibh. Cras a laoreet nulla, ac commodo tortor.
          Quisque semper imperdiet pharetra. Ut vel magna velit. Nulla finibus
          felis at feugiat convallis. Duis euismod libero vitae risus euismod,
          ac fringilla nunc vulputate. Ut molestie massa nec nisi luctus
          imperdiet non sed felis. Duis pretium risus nec vestibulum ultrices.
          Aliquam a velit nulla. Nullam consequat sollicitudin mauris sit amet
          aliquet. Proin fringilla mattis lacus, at pellentesque ipsum mattis
          mattis. Etiam vitae gravida neque. Pellentesque vel pulvinar magna. Ut
          in malesuada turpis, non dignissim magna. Integer ultricies, felis id
          egestas auctor, elit lacus bibendum arcu, vitae consectetur ante augue
          in justo. Vivamus ultricies ex tellus, pharetra faucibus arcu
          fermentum ac. Morbi non metus nunc. Maecenas sodales ligula nisi, quis
          fermentum odio ornare sit amet. Donec mollis ullamcorper ex. Donec
          interdum condimentum leo in porttitor. Quisque at lacus a metus
          gravida dapibus. Morbi odio orci, imperdiet sed accumsan nec, viverra
          tincidunt dolor. Nunc aliquet, mauris eget bibendum sagittis, massa
          ipsum sagittis neque, id condimentum orci arcu in sem. Quisque sed
          scelerisque diam. Aliquam et nulla lectus. Donec eu feugiat elit, quis
          malesuada dolor. Vivamus porttitor leo vel magna consectetur, quis
          maximus nulla porttitor. Nunc risus urna, porttitor ac turpis sed,
          feugiat suscipit lectus. Nullam id ligula nunc. Mauris eu pellentesque
          dui, non scelerisque ipsum. Ut blandit ante a est dictum, eu varius
          urna tempor. Proin eget vestibulum sapien. Ut tempor urna sit amet
          turpis interdum, non consectetur leo fringilla. Nam rutrum, augue a
          vulputate egestas, sem ipsum convallis ipsum, a blandit mauris magna
          et mauris. Vivamus eget venenatis tellus, sit amet rutrum ipsum. Cras
          quis augue vitae massa tristique semper et id tellus. Nulla vel diam
          ac massa laoreet ullamcorper id at lacus. In turpis lectus, laoreet
          sed erat at, vulputate finibus dui. Aliquam nunc nulla, pretium sit
          amet nulla et, ullamcorper finibus orci. Phasellus mattis justo nulla,
          eu vehicula ante luctus tincidunt. Vivamus eget felis sit amet libero
          laoreet suscipit. Fusce sollicitudin tempor felis id dictum. Nam et
          magna laoreet arcu sollicitudin sollicitudin quis pulvinar nisl.
          Curabitur lacus sapien, congue quis pulvinar eget, cursus et massa.
          Curabitur quis nulla efficitur, egestas libero in, aliquam massa. Ut
          quis egestas nisl. Suspendisse augue eros, porttitor ut dictum nec,
          euismod ac elit. Curabitur vitae feugiat nisi. Phasellus orci quam,
          semper sit amet enim eu, rutrum aliquet nibh. Sed iaculis porttitor
          est, quis placerat est eleifend non. Nullam eu elit finibus, ultricies
          purus at, porta leo. Nunc sodales semper urna, vitae pulvinar risus
          ornare a. Cras nunc sem, placerat vitae ornare id, finibus
          pellentesque nunc. Sed viverra ipsum sapien, non mollis ligula porta
          eget. Pellentesque vestibulum facilisis est, eu feugiat lacus
          condimentum quis. Donec lacinia dui nec mauris placerat varius.
          Integer fermentum dignissim ultricies. Vivamus efficitur tortor at
          diam maximus pharetra. Etiam faucibus, eros nec ullamcorper iaculis,
          libero nisl lobortis est, vel luctus erat nibh vel leo. Fusce posuere
          tortor sit amet mi varius congue. Praesent ante est, sagittis ut
          varius a, pellentesque a elit. Curabitur mollis urna nisl. Nulla vel
          quam mauris. Donec tellus enim, volutpat a libero et, luctus lacinia
          urna. Nunc sed blandit nulla, at facilisis orci. Aenean bibendum sed
          nisl ut euismod. Aenean suscipit condimentum metus, ac vulputate quam
          accumsan at. Nullam maximus, elit vitae euismod aliquet, nisl velit
          viverra justo, eget hendrerit lacus tellus condimentum lorem. Morbi
          urna turpis, euismod vitae ultrices sagittis, fringilla at mauris.
          Duis hendrerit velit sit amet felis hendrerit, eget vehicula libero
          elementum. Fusce ac ante ac odio ultricies auctor id eget sem.
          Vestibulum sit amet hendrerit ex. Suspendisse rhoncus, leo non
          tincidunt pellentesque, nunc mauris placerat odio, a molestie magna ex
          at diam. Vivamus dictum erat leo, vitae facilisis sem tincidunt nec.
          Vestibulum viverra vulputate sem ut consectetur. Pellentesque lacus
          massa, scelerisque sit amet arcu non, fringilla dictum nisl. Nunc
          accumsan id ligula sit amet egestas. Duis sed nunc vitae sem euismod
          venenatis sit amet id quam. Cras quis sodales neque, a feugiat eros.
          In at metus a tellus finibus pellentesque. Proin eu vulputate lorem.
          Praesent mollis libero non ipsum molestie, ut dictum enim aliquet. Sed
          ultricies laoreet ante sodales eleifend. Integer vel aliquet lectus,
          eget mattis massa. Vestibulum diam massa, ullamcorper ut finibus nec,
          consectetur eu lectus. Sed varius consequat orci non aliquam. Sed
          dictum nisi id congue vestibulum. Maecenas ultricies urna in ipsum
          tristique maximus. Mauris maximus a diam sed molestie. Maecenas vel
          elit cursus, porttitor lorem id, fringilla neque. Phasellus lacinia
          pharetra dui, in fringilla sem suscipit cursus. Suspendisse vitae
          augue quis ligula rutrum egestas quis non velit. Aenean urna diam,
          elementum ac imperdiet interdum, elementum non ligula. Sed posuere
          neque aliquet, iaculis diam sed, luctus eros. Ut ut elit vestibulum,
          tempus risus at, pellentesque urna. Sed vel neque et ex tempus porta.
          Donec imperdiet massa id sapien iaculis eleifend. Integer rutrum nibh
          ac nulla tincidunt, vitae porttitor massa posuere. Morbi gravida
          auctor ipsum, eget varius nunc. Aenean luctus, urna quis rhoncus
          dapibus, dui ante lobortis nibh, sed tempor nibh massa vel elit. Donec
          sollicitudin risus a tempor semper. Nulla at sapien id ante rhoncus
          convallis. Sed risus nunc, scelerisque vel erat et, feugiat pharetra
          elit. Praesent sodales id urna vitae scelerisque. Donec lobortis mi
          vitae nisi porttitor, quis vulputate lorem laoreet. Aenean molestie mi
          in sem aliquet, at rutrum leo ultricies. In eros est, iaculis et
          libero vel, convallis faucibus neque. Curabitur fringilla odio et
          tellus ultrices, sit amet blandit enim cursus. Donec efficitur rutrum
          sem at ultricies. Vestibulum a rhoncus erat. Aenean ac varius elit.
          Sed vel dolor sit amet leo elementum imperdiet. Aenean blandit, nunc
          eget aliquet semper, velit erat consectetur risus, vel aliquet justo
          metus ut arcu. Maecenas eu aliquet justo, eu venenatis diam. Fusce
          efficitur, ligula ut lobortis scelerisque, turpis nisl elementum
          ligula, sed condimentum sem lorem sit amet orci. Donec ut ipsum quam.
          Praesent pellentesque neque lorem, at fringilla eros commodo eget. Ut
          sed efficitur neque. Curabitur sodales nibh non nisl viverra volutpat.
          Sed arcu orci, posuere nec eros eget, consectetur sagittis urna. Nam
          vulputate pretium mattis. Fusce auctor felis ut ex porta, eget
          ultrices felis vulputate. Integer justo orci, ullamcorper quis lacus
          id, dignissim malesuada nibh. Nulla a bibendum ligula. Mauris quis
          dolor eget dolor vehicula placerat. Aliquam convallis auctor
          porttitor. Nullam bibendum finibus sapien, vitae molestie augue
          porttitor sit amet. Vestibulum et faucibus ante. Suspendisse non erat
          leo. Duis finibus condimentum sapien eget ornare. Quisque non vehicula
          ipsum. Fusce nec purus vitae magna vulputate sodales. Vivamus laoreet
          lectus id turpis cursus, porta suscipit elit sagittis. Pellentesque
          tincidunt turpis ac augue tincidunt ultricies. Etiam sit amet diam
          libero. Duis viverra metus vel fermentum convallis. Donec vulputate mi
          enim, sit amet dapibus dui tempus id. Mauris finibus lectus quis
          interdum fringilla. Suspendisse laoreet, mauris at interdum
          consectetur, nisi sapien convallis diam, a tempor massa lectus id
          diam. Ut condimentum sagittis nisi, vel consectetur mauris volutpat
          porta. Curabitur hendrerit metus nulla, a eleifend nulla auctor
          pulvinar. In tempus magna eget lectus suscipit, vitae rhoncus massa
          tempus. Donec urna felis, condimentum quis purus vitae, aliquet
          gravida justo. Duis sed lorem eget orci semper lacinia. Orci varius
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Duis et orci facilisis, dictum ex sed, sodales risus. Suspendisse
          gravida sagittis ultrices. In id orci tincidunt, aliquet nulla sit
          amet, facilisis nibh. Fusce feugiat elementum condimentum. Suspendisse
          sit amet risus eu sem dictum malesuada. Fusce varius pulvinar mi eu
          venenatis. Aliquam efficitur, lacus vel pellentesque dapibus, ante
          lectus hendrerit sapien, quis consequat est sem sit amet mauris. Nulla
          massa nisi, posuere ac libero eget, mattis vestibulum odio. Quisque
          eget arcu lacus. Maecenas finibus tellus nec sapien facilisis pretium.
          Proin tristique aliquam dolor, quis interdum dui lacinia sit amet.
          Nulla eget bibendum arcu. Integer eu viverra dui. Morbi vitae sem
          semper, feugiat diam non, pulvinar tortor. Nunc est arcu, gravida a
          pharetra at, rhoncus ut tellus. Nulla facilisi. Quisque diam velit,
          tempus id aliquet ac, scelerisque a justo. Integer ac maximus eros.
          Vivamus et sodales diam, nec placerat turpis.
        </p>
      </Route>
    </div>
  );
};

export default Content;
